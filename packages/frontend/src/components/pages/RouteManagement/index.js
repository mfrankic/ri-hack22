import React, { memo } from 'react';
import { Page } from 'src/components/common';

import './index.css';

const RouteManagement = () => {
  return (
    <Page>
      <div className="map-container">
        <iframe
          title="Područja kontejnera"
          width="1050"
          height="600"
          src="http://data.rijeka.hr/dataset/lokacije-kontejnera/resource/3463a430-4443-4b3d-909e-b62bbd45573d/view/64cd31dc-f357-4245-a536-a19f59448557"
          frameBorder="0"
        />
      </div>
      <div className="data-container">
        <iframe
          title="Tablica kontejnera"
          width="1400"
          height="800"
          src="http://data.rijeka.hr/dataset/lokacije-kontejnera/resource/121c7b9e-ea85-4525-bced-e68481217aa9/view/a3c8540a-b04b-477b-bfb7-eb1c8cd3ac7c"
          frameBorder="0"
        />
      </div>
    </Page>
  );
};

export default memo(RouteManagement);
