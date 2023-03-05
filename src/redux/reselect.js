import { createSelector } from "@reduxjs/toolkit";

export const userSelector = createSelector( store => store.persistedReducer.user, user => user);
export const findUserSelector = createSelector( store => store.persistedReducer.findUsers, user => user);
export const notificationSelector = createSelector( store => store.persistedReducer.notification, user => user);