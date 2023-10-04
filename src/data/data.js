const data = async () => {
    const countries = ['czechia', 'poland', 'germany', 'ukraine'];
    let data = [];

    for (const country of countries) {
        const importedEntries = await import(`./${country}.js`);
        const importedFlag = await import(`./${country}.svg`);
        const { entries, label, name } = importedEntries.country;
        data = [
            ...data,
            {
                entries,
                label,
                name,
                flag: importedFlag.default,
            },
        ];
    }

    return data;
};

export default data;
