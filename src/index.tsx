import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  Platform,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';

interface UnityMessage {
  message: string;
}

type ReactNativeUnityViewProps = {
  androidKeepPlayerMounted?: boolean;
  fullScreen?: boolean;
  onUnityMessage?: (event: NativeSyntheticEvent<UnityMessage>) => void;
  style?: ViewStyle;
};

const ComponentName = 'ReactNativeUnityView';

const ReactNativeUnityView =
  requireNativeComponent<ReactNativeUnityViewProps>(ComponentName);

export default class UnityView extends React.Component<ReactNativeUnityViewProps> {
  static defaultProps = {};

  constructor(props: ReactNativeUnityViewProps) {
    super(props);
  }

  public postMessage(gameObject: string, methodName: string, message: string) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('postMessage'),
      [gameObject, methodName, message]
    );
  }

  public unloadUnity() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('unloadUnity'),
      []
    );
  }

  public pauseUnity(pause: boolean) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('pauseUnity'),
      [pause]
    );
  }

  public resumeUnity() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('resumeUnity'),
      []
    );
  }

  private getCommand(cmd: string): any {
    if (Platform.OS === 'ios') {
      return UIManager.getViewManagerConfig('ReactNativeUnityView').Commands[
        cmd
      ];
    } else {
      return cmd;
    }
  }

  private getProps() {
    return {
      ...this.props,
    };
  }

  // 재로그인시 유니티 실행을 위해서 삭제
  // 2022-07-01
  // public componentWillUnmount() {
  //   this.unloadUnity();
  // }

  public render() {
    return <ReactNativeUnityView {...this.getProps()} />;
  }
}
