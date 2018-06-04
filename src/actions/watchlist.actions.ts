import * as m from '../models';

export const actionTypes = {
  ADD_TO_WATCHLIST: '[Watchlist] Add To Watchlist',
  ADD_TO_WATCHLIST_SUCCESS: '[Watchlist] Add To Watchlist Success',
  ADD_TO_WATCHLIST_FAIL: '[Watchlist] Add To Watchlist Fail',

  REMOVE_FROM_WATCHLIST: '[Watchlist] Remove From Watchlist',
  REMOVE_FROM_WATCHLIST_SUCCESS: '[Watchlist] Remove From Watchlist Success',
  REMOVE_FROM_WATCHLIST_FAIL: '[Watchlist] Remove From Watchlist Fail',

  OPEN_SIDEBAR: '[Watchlist] Open Sidebar',
  CLOSE_SIDEBAR: '[Watchlist] Close Sidebar',
}

export class AddToWatchListAction {
  public readonly type = actionTypes.ADD_TO_WATCHLIST;
  constructor(public readonly payload: m.IWatchList) {}
}

export class AddToWatchListSuccessAction {
  public readonly type = actionTypes.ADD_TO_WATCHLIST_SUCCESS;
  constructor(public readonly payload: m.IWatchList) {}
}

export class AddToWatchListFailAction {
  public readonly type = actionTypes.ADD_TO_WATCHLIST_FAIL;
  constructor(public readonly payload: m.IWatchList) {}
}

export class RemoveFromWatchListAction {
  public readonly type = actionTypes.REMOVE_FROM_WATCHLIST;
  constructor(public readonly payload: string) {}
}

export class RemoveFromWatchListSuccessAction {
  public readonly type = actionTypes.REMOVE_FROM_WATCHLIST_SUCCESS;
  constructor(public readonly payload: string) {}
}

export class RemoveFromWatchListFailAction {
  public readonly type = actionTypes.REMOVE_FROM_WATCHLIST_FAIL;
  constructor(public readonly payload: void = undefined) {}
}

export class OpenSideBarAction {
  public readonly type = actionTypes.OPEN_SIDEBAR;
  constructor(public readonly payload: void = undefined) {}
}

export class CloseSideBarAction {
  public readonly type = actionTypes.CLOSE_SIDEBAR;
  constructor(public readonly payload: void = undefined) {}
}

export type actions = AddToWatchListAction
| AddToWatchListSuccessAction
| AddToWatchListFailAction
| RemoveFromWatchListAction
| RemoveFromWatchListSuccessAction
| RemoveFromWatchListFailAction
| OpenSideBarAction
| CloseSideBarAction;
