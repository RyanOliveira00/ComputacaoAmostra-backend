import { BadRequestException, Injectable } from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs';
import { TVote } from 'src/modules/votes/types';
import * as tmp from 'tmp';
import { Project } from 'src/modules/projects/entities/project.entity';
import { TUser } from 'src/modules/users/types';

@Injectable()
export class ExceljsService {
  async fillResultSheet(projects: Project[]) {
    const book = new Workbook();
    const rows = [];
    for (const project of projects) {
      const sheet = book.addWorksheet(project.name);
      project.votes.map((vote) => {
        if (rows.find((row) => row.email === (vote.userId as TUser).email))
          return;
        rows.push({
          date: new Date(vote.createdAt).toLocaleString('pt-br', {
            timeZone: 'UTC',
          }),
          email: (vote.userId as TUser).email,
          name: (vote.userId as TUser).name,
          vote_count: (vote.userId as TUser).voteCount,
        });
      });
      const data = [];
      rows.forEach((row) => {
        data.push(Object.values(row));
      });
      data.unshift(Object.keys(rows[0]));
      sheet.addRows(data);
      this.styleSheet(sheet);
    }

    const File = await new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'resultadoCompAmostra',
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          try {
            if (err) throw new BadRequestException(err);
            await book.xlsx.writeFile(file);
            resolve(file);
          } catch (error) {
            throw new BadRequestException(err);
          }
        },
      );
    });

    return File;
  }
  async fillProjectSheet(project: Project) {
    const book = new Workbook();
    const sheet = book.addWorksheet(project.name);
    const rows = (project.votes as TVote[]).map((vote) => {
      return {
        date: new Date(vote.createdAt).toLocaleString('pt-br', {
          timeZone: 'UTC',
        }),
        email: (vote.userId as TUser).email,
        name: (vote.userId as TUser).name,
      };
    });
    const data = [];
    rows.forEach((row) => {
      data.push(Object.values(row));
    });
    data.unshift(Object.keys(rows[0]));
    sheet.addRows(data);
    this.styleSheet(sheet);

    const File = await new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'resultadoCompAmostra_' + project.name.replace(' ', ''),
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          try {
            if (err) throw new BadRequestException(err);
            await book.xlsx.writeFile(file);
            resolve(file);
          } catch (error) {
            throw new BadRequestException(err);
          }
        },
      );
    });

    return File;
  }

  private styleSheet(sheet: Worksheet) {
    sheet.getColumn(1).width = 30;
    sheet.getColumn(2).width = 30;
    sheet.getColumn(3).width = 30;
    sheet.getColumn(4).width = 30;
    sheet.getRow(1).height = 20;
    sheet.getRow(1).font = { size: 14, bold: true };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: '#2F4F4F' },
      fgColor: { argb: '#2F4F4F' },
    };
    sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    sheet.getRow(1).border = {
      bottom: { style: 'thin', color: { argb: '#' } },
    };
  }
}
