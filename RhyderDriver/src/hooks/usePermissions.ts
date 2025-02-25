import { useEffect, useState } from "react";
import {
  request,
  check,
  RESULTS,
  Permission,
} from "react-native-permissions";

const usePermissions = (permissionType: Permission) => {
  const [granted, setGranted] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      const result = await check(permissionType);
      if (result === RESULTS.GRANTED) {
        setGranted(true);
      } else {
        requestPermission();
      }
    };

    const requestPermission = async () => {
      const result = await request(permissionType);
      setGranted(result === RESULTS.GRANTED);
    };

    checkPermission();
  }, [permissionType]);

  return granted;
};

export default usePermissions;
