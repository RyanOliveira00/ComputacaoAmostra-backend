import { configurationService } from '@app/config';

export function isApiKeyValid(testedKey: string, keyType: 'DEV' | 'CLIENT') {
  return testedKey === configurationService.getValue(`API_${keyType}_KEY`);
}
