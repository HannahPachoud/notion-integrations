import {ResponsiveBar} from '@nivo/bar'
import React from "react";

export default function Graph(data) {
    if (!data) return;
    return (<div className="App" style={{height: 300}}>
        <ResponsiveBar
            width={800}
            height={300}
            data={data}
            keys={["amount"]}
            maxValue={2500}
            padding={0.6}
            margin={{
                top: 50,
                right: 10,
                bottom: 36,
                left: 36
            }}
            indexBy="category"
            enableLabel={false}
            colors={{scheme: 'purpleRed_green'}}
            colorBy={"index"}
            borderRadius={2}
            axisLeft={{
                tickValues: 7
            }}
        />
    </div>)

}