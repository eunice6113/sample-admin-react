import * as React from "react";
import { useState, useEffect } from "react";
import { BasePage } from "../../shared/components/base/BasePage";

interface IProps {
    children: React.ReactNode;
}

export const UiGuide: React.FC<IProps> = ({children}) => {

    return(
    <BasePage>
        <h1>UI GUIDE!!</h1>
    </BasePage>)
}
