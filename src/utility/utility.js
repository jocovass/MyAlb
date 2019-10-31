export const mergeObj = (oldState, newState) => {
    return {
        ...oldState,
        ...newState,
    };
};