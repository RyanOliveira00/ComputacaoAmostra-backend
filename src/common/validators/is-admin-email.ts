import { configurationService } from '@app/config';

export function isEmailAdmin(email: string) {
  return email === configurationService.getValue('ADMIN_EMAIL');
}
