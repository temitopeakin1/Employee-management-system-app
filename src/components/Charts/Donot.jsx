import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
  AccumulationSelection,
  Selection,
  ChartAnnotation,
  AccumulationAnnotation
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../../contexts/ContextProvider";

const Donot = ({id, legendVisibility, height, data }) => {
  const { currentMode } = useStateContext();

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{
        visible: legendVisibility,
        toggleVisibility: true,
        position: "Right",
        height: "50%",
        width: "20%",
        textWrap: "Wrap",
        MaximumLabelWidth: 100,
      }}
      enableSmartLabels={false}
      selectionMode={'Point'}
      enableBorderOnMouseMove={false}
      height={height}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      tooltip={{ enable: false }}
    >
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationDataLabel,
          AccumulationTooltip,
          AccumulationSelection,
          Selection,
          ChartAnnotation,
          AccumulationAnnotation
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Departments"
          dataSource={data}
          xName="x"
          yName="y"
          innerRadius="80%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: false,
            name: "text",
            position: "Inside",
            font: {
              fontWeight: "600",
              color: "white",
              size: 14,
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Donot;
