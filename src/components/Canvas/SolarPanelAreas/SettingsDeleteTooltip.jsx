import { Html } from "react-konva-utils";
import Tooltip from "../../Tooltip";
import SettingsIcon from "../../../assets/SettingsIcon";
import DeleteIcon from "../../../assets/DeleteIcon";

export default function SettingsDeleteTooltip({
  position = { x: 0, y: 0 },
  onDelete = () => {},
  onSettings = () => {},
}) {
  return (
    <Html>
      <Tooltip position={position}>
        <div className="flex gap-2">
          <button onClick={onSettings}>
            <SettingsIcon className="w-5" />
          </button>
          <button onClick={onDelete}>
            <DeleteIcon className="w-5" />
          </button>
        </div>
      </Tooltip>
    </Html>
  );
}
