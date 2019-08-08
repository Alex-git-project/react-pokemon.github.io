import React from 'react';

export const isEmpty = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
};
