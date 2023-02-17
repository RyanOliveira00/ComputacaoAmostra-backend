import { BadRequestException, Injectable } from '@nestjs/common';
import { Project } from '../../modules/projects/entities/project.entity';
import * as tmp from 'tmp';
import { Workbook } from 'exceljs';
import { TVote } from 'src/modules/votes/types';
import { TUser } from '../../modules/users/types';

@Injectable()
export class ExceljsService {
  async fillResultSheet(projects: Project[]) {
    const book = new Workbook();

    for (const project of projects) {
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
      sheet.addRows([Object.keys(rows[0]), ...rows]);
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
    sheet.addRows([Object.keys(rows[0]), ...rows]);

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
}
