export const roles = Object.freeze({
  GHIDARE: 'ghidare',
  PRIMIRE: 'primire',
  SECTOARE: 'sectoare',
  RUGACIUNE: 'rugaciune',
});

export const positions = Object.freeze({
  PARTER: 'parter',
  ETAJ_2: 'etaj 1',
  PRIMIRE: 'primire',
  PRIMIRE_EST: 'primire est',
  PRIMIRE_VEST: 'primire vest',
  SECTOR_A: 'sector a',
  SECTOR_B: 'sector b',
  SECTOR_C: 'sector c',
  SECTOR_D: 'sector d',
  SECTOR_E: 'sector e',
  SECTOR_F: 'sector f',
  SECTOR_EST: 'sector est',
  SECTOR_CENTRU: 'sector centru',
  SECTOR_VEST: 'sector vest',
  RUGACIUNE: 'rugaciune',
});

const positionRoleMap = new Map();
positionRoleMap.set(positions.PARTER, roles.GHIDARE);
positionRoleMap.set(positions.ETAJ_2, roles.GHIDARE);
positionRoleMap.set(positions.PRIMIRE, roles.PRIMIRE);
positionRoleMap.set(positions.PRIMIRE_EST, roles.PRIMIRE);
positionRoleMap.set(positions.PRIMIRE_VEST, roles.PRIMIRE);
positionRoleMap.set(positions.SECTOR_A, roles.SECTOARE);
positionRoleMap.set(positions.SECTOR_B, roles.SECTOARE);
positionRoleMap.set(positions.SECTOR_C, roles.SECTOARE);
positionRoleMap.set(positions.SECTOR_D, roles.SECTOARE);
positionRoleMap.set(positions.SECTOR_E, roles.SECTOARE);
positionRoleMap.set(positions.SECTOR_EST, roles.SECTOARE);
positionRoleMap.set(positions.SECTOR_VEST, roles.SECTOARE);
positionRoleMap.set(positions.RUGACIUNE, roles.RUGACIUNE);

const roleColorsMap = new Map();
roleColorsMap.set(roles.GHIDARE, '#ffdd67');
roleColorsMap.set(roles.PRIMIRE, '#acbd86');
roleColorsMap.set(roles.SECTOARE, '#665c84');
roleColorsMap.set(roles.RUGACIUNE, '#cf455c');

export const positionRoles = Object.freeze(positionRoleMap);

export const roleColors = Object.freeze(roleColorsMap);

export function getPositionColor(position) {
  return roleColorsMap.get(positionRoleMap.get(position));
}
