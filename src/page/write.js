import React, { useContext } from 'react';
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import WriteVoc from '../components/writeVoc';

const Write = observer(() => {
    const { voc } = useContext(Context);

    return (
        <WriteVoc voc={voc}/>
    );
});

export default Write;