import {StackActions} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

export function changeNavigation(name) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}
export function replaceNavigation(name) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name));
  }
}

export function resetNavigation() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

export function popNavigation(n) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(n));
  }
}

export function goBackNavigation() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.goBack());
  }
}
