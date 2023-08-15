// import React from 'react'
// import { storiesOf } from "@storybook/react";
import EnigmaPatternLock from '..';
import type { Meta, StoryObj } from '@storybook/react';
// const stories = storiesOf("App test", module)
const meta: Meta<typeof EnigmaPatternLock> = {
    component: EnigmaPatternLock,
};
export default meta;
type Story = StoryObj<typeof EnigmaPatternLock>;

// stories.add("App", () => {
//     return (<EnigmaPatternLock pattern="1020" totalTries={5} onSuccess={() => alert("Success")} onFailure={() => alert("Failure")} onTryDepeletion={(remainingTries) => {
//         console.log('====================================');
//         console.log("Tries remain: " + remainingTries);
//         console.log('====================================')
//     }}
//     />)
// });

export const Primary: Story = {
    args: {
        pattern: "1011",
        format: ["P","R"],
        changeKeypad: true,
        onSuccess: () => { alert("Success")},
        onFailure: () => { alert("Failure")},
        formatChangeBtn: true,
        totalTries: 3,
        onTryDepeletion(RemainingTries) {
            console.log(RemainingTries);
        },
    },
};