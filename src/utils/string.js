const capitalize = (name) => {
    if (!name) return '';
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

const capitalizeWords = (name) => {
    return name
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
};

export { capitalize, capitalizeWords };