import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminCreateMap from "../../components/AdminCreateMap";
import { SVGBase } from "../../types/svg-base";
import { Alert, AlertIcon, useDisclosure } from "@chakra-ui/react";
import AdminCreateMapModal from "../../components/AdminCreateMapModal";

const AdminCreateMapContainer: FC = () => {
  const [file, setFile] = useState(null);
  const [svgMap, setSvgMap] = useState<SVGBase>();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          const payload = { svg: result };
          axiosClient
            .post(`/maps/preview`, payload)
            .then((response) => {
              setSvgMap(response.data);
              onOpen();
            })
            .catch((error) => setError(error.response.data));
        }
      };

      fileReader.readAsText(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <>
      {error && (
        <Alert status="error" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <AdminCreateMap onUpload={handleUpload} />
      <AdminCreateMapModal
        svgMap={svgMap}
        isOpen={isOpen}
        onClose={onClose}
        setError={setError}
      />
    </>
  );
};

export default AdminCreateMapContainer;
