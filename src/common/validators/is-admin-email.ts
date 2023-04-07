import { configurationService } from '../../config/config.service';

export function isEmailAdmin(email: string) {
  return email === configurationService.getValue('ADMIN_EMAIL');
}
