const formatId = (id) => {
    if (!id) return '';
    return `#${String(id).padStart(4, '0')}`;
};

export default formatId;