import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
} from '@react-navigation/native';

export enum ScreenName {
  Loader = 'Loader',
  onBoardOne = 'onBoardOne',
  onBoardTwo = 'onBoardTwo',
  onBoardTree = 'onBoardThree',
  onBoardFour = 'onBoardFour',
  onBoardFive = 'onBoardFive',
  MainLayout = 'MainLayout',
}

export const useNavigation = () => {
  const {dispatch} = useStackNavigation();

  const currentScreen = useNavigationState(state =>
    state?.routes ? state.routes[state.index].name : '',
  );

  const navigate = (screen: ScreenName, params?: Record<string, any>) => {
    if (currentScreen === screen) {
      return;
    }
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen, params}],
      }),
    );
  };
  return {navigate, currentScreen};
};
