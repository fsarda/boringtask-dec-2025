import { useMarket, useOrders } from "@/app/state";
import { Suspense } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, colorSchemeDarkWarm, themeQuartz } from "ag-grid-community";
import { Order } from "@/types/orders";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { RowGroupingModule } from "ag-grid-enterprise";
import { Spread } from "./Spread";

ModuleRegistry.registerModules([AllCommunityModule, RowGroupingModule]);

const colDefs: ColDef<Order>[] = [
  {
    field: "side",
    rowGroup: true,
  },
  {
    field: "price",
  },
  {
    field: "qty",
  },
  {
    field: "id",
  },
  {
    field: "hash",
  },
];

const OrdersBookInternal = () => {
  const orders = useOrders();
  const market = useMarket();

  return market ? (
    <div className="w-full h-full">
      <AgGridReact
        rowData={orders}
        columnDefs={colDefs}
        gridOptions={{
          theme: themeQuartz.withPart(colorSchemeDarkWarm),
          defaultColDef: {
            filter: true,
            floatingFilter: true,
            flex: 1,
            minWidth: 100,
            enableRowGroup: true,
          },
          autoGroupColumnDef: {
            minWidth: 200,
          },
          rowGroupPanelShow: "always",
          groupDefaultExpanded: 1,
        }}
      />
    </div>
  ) : (
    <p>No Market selected</p>
  );
};

export const OrdersBook = () => (
  <>
    <Spread />
    <Suspense fallback={"Loading orders..."}>
      <OrdersBookInternal />
    </Suspense>
  </>
);
