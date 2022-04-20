import React from "react";
import { storiesOf } from "@storybook/react";

import { WordMachine } from "../components/WordMachine";

const stories = storiesOf('App test', module);

stories.add('App', () => {
    return (<WordMachine />);
});