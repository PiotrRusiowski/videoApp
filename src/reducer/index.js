import { actionsTypes } from "../actions/actionsTypes";
import { sortTypes } from "../data/sortTypes";
import {
  getVideosFromLocalStorage,
  getLikesVideosFromLocalStorage,
} from "../utils/localStorageGetter";

const initialState = {
  showVideos: [],
  allVideosList: getVideosFromLocalStorage(),
  likesVideosList: getLikesVideosFromLocalStorage(),
  isList: false,
};
const reducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case actionsTypes.GET_VIDEO:
      let isVideoInList;

      state.allVideosList.forEach((video) => {
        if (video.id === payload.id) {
          isVideoInList = true;
        }
      });

      if (isVideoInList) {
        return {
          ...state,
          allVideosList: [...state.allVideosList],
        };
      } else {
        return {
          ...state,
          allVideosList: [...state.allVideosList, payload],
        };
      }

    case actionsTypes.DELETE_SINGLE_VIDEO:
      const videosListAfterDelete = state.allVideosList.filter(
        (video) => video.id !== payload
      );

      return {
        ...state,
        allVideosList: [...videosListAfterDelete],
      };
    case actionsTypes.ADD_TO_LIKES:
      const likeVideo = state.allVideosList.find(
        (video) => video.id === payload
      );
      return {
        ...state,
        likesVideosList: [...state.likesVideosList, likeVideo],
      };
    case actionsTypes.DELETE_ALL_VIDEOS:
      return {
        ...state,
        allVideosList: [],
        likesVideosList: [],
      };
    case actionsTypes.SHOW_LIKES_VIDEOS:
      return {
        ...state,
        showVideos: state.likesVideosList,
      };
    case actionsTypes.SHOW_ALL_VIDEOS:
      return {
        ...state,
        showVideos: state.allVideosList,
      };
    case actionsTypes.DELETE_SINGLE_LIKES_VIDEO:
      const likesVideosListAfterDelete = state.likesVideosList.filter(
        (video) => video.id !== payload
      );

      return {
        ...state,
        likesVideosList: [...likesVideosListAfterDelete],
      };
    case actionsTypes.SELECT_VIDEOS_LIST_VIEW:
      return {
        ...state,
        isList: !state.isList,
      };
    case actionsTypes.IS_HOVER_TRUE:
      const mapShowVideos = state.showVideos.map((video) => {
        if (payload === video.id) {
          video.isHover = true;
        }
        return video;
      });
      return {
        ...state,
        showVideos: mapShowVideos,
      };
    case actionsTypes.IS_HOVER_FALSE:
      const isHoverFalse = state.showVideos.map((video) => {
        video.isHover = false;
        return video;
      });

      return {
        ...state,
        showVideos: isHoverFalse,
      };

    case actionsTypes.SORT_VIDEOS:
      let sortedVideos;

      switch (payload) {
        case sortTypes.descending:
          sortedVideos = state.allVideosList.sort(
            (videoOne, videoTwo) => videoTwo.publishedAt - videoOne.publishedAt
          );

          break;

        case sortTypes.ascending:
          sortedVideos = state.allVideosList.sort(
            (videoOne, videoTwo) => videoOne.publishedAt - videoTwo.publishedAt
          );

          break;

        default:
          sortedVideos = state.allVideosList;
      }

      return {
        ...state,
        showVideos: [...sortedVideos],
      };

    default:
      return state;
  }
};

export default reducer;
