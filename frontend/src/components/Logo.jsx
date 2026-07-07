import { APP_NAME } from "../utils/constants";

function Logo() {
  return (
    <div className="text-2xl font-bold text-green-700">
      🌿 {APP_NAME}
    </div>
  );
}

export default Logo;