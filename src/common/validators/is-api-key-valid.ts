import { configurationService } from '@app/config';

export function isApiKeyValid(testedKey: string, keyType: 'DEV' | 'NORMAL') {
  return testedKey === configurationService.getValue(`API_${keyType}_KEY`);
}
