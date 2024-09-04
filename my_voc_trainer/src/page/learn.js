import React, { useContext } from 'react';
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import LearnVoc from '../components/learnVoc';

const Learn = observer(() => {
    const { voc } = useContext(Context);

    return (
        <LearnVoc voc={voc} />
    );
});

export default Learn;