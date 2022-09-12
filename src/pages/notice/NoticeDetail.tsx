import * as React from "react";
import { useState, useEffect } from "react";
import { BasePage } from "../../shared/components/base/BasePage";

interface IProps {
    children: React.ReactNode;
}

export const NoticeDetail: React.FC<IProps> = ({children}) => {

    return(
    <BasePage>
        <h1>notice list!!</h1>
    </BasePage>)
}
