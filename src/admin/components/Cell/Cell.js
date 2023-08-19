import { useEffect, useState } from "react";
import ImageDrop from "../ImageDrop";
import CheckBox from "../CheckBox";
import Input from "../Input";
import useLocations from "../../hooks/useLocations";
import DropDown from "../DropDown";
import LoadingDropDown from "../LoadingDropDown";
import { createLocation } from "../../services/firebase";

const Cell = ({ data, column, update }) => {
  let objectID = data.id;

  const [cellData, setCellData] = useState(data[column.accessor]);
  const [locations, loading, error] = useLocations();

  useEffect(() => {
    setCellData(data[column.accessor]);
    console.log(data);
  }, [data]);

  if (column.type === "checkBox") {
    return (
      <td>
        <CheckBox
          checked={cellData}
          update={(checked) => update(objectID, { [column.accessor]: checked })}
        />
      </td>
    );
  } else if (column.type === "imageDrop") {
    return (
      <td>
        <ImageDrop imageStartUrl={cellData} imageID={data.id} update={update} />
      </td>
    );
  } else if (column.type === "location") {
    if (loading) {
      return (
        <td>
          <LoadingDropDown />
        </td>
      );
    } else {
      return (
        <td>
          <DropDown
            labels={locations}
            value={data[column.accessor]}
            createLabel={createLocation}
            onChange={(location) =>
              update(objectID, { [column.accessor]: location })
            }
          />
        </td>
      );
    }
  } else {
    return (
      <td>
        <Input
          type={column.type}
          value={cellData}
          onEdit={(edited) => {
            update(objectID, {
              [column.accessor]: edited,
            });
          }}
        />
      </td>
    );
  }
};

export default Cell;
