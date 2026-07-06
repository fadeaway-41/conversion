export const handleUploadBoxMouseEnter = (e) => {
    e.currentTarget.classList.add('is-hovering');
};

export const handleUploadBoxMouseLeave = (e) => {
    const el = e.currentTarget;
    const currentColor = getComputedStyle(el).borderColor;

    el.classList.remove('is-hovering');
    el.style.borderColor = currentColor;

    requestAnimationFrame(() => {
        el.style.borderColor = '';
    });
};