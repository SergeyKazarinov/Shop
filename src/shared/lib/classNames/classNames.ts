type TMods = Record<string, boolean | string>;

export const classNames = (cls: string, mods?: TMods, additional?: string[]): string => {
  const newAdditional = additional ? additional.filter(Boolean) : [];
  const newMods = mods
    // eslint-disable-next-line
    ? Object.entries(mods).filter(([key, value]) => Boolean(value)).map(([key, value]) => key)
    : [];

  return [
    cls,
    ...newMods,
    ...newAdditional,
  ].join(' ');
};
