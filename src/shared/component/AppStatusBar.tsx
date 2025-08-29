import { View, Text, StatusBar, StatusBarStyle } from 'react-native'
import React, { FC, memo } from 'react'

interface AppStatusBarInterface {
    backgroundColor?: string,
    barStyle?: StatusBarStyle
}

const AppStatusBar: FC<AppStatusBarInterface> = ({
    backgroundColor = 'transparent',
    barStyle = 'default'
}) => {

    return (
        <StatusBar
            animated
            translucent
            backgroundColor={backgroundColor}
            barStyle={barStyle}
        />
    )
}

export default memo(AppStatusBar)