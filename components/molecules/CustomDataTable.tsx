import { DataTable } from 'react-native-paper';
import { Text } from 'react-native';
import React from 'react';

type CustomDataTableProps = {
  headers: string[]; 
  data: Array<string[]>; 
};

export default function CustomDataTable({ headers, data }: CustomDataTableProps){
  return (

    <DataTable className="w-full mt-1 ml-1">

      <DataTable.Header className="border-y-0 h-11">

        {headers.map((header, index) => (

          <DataTable.Title key={index}>
            <Text className="text-gray-500 text-sm font-iregular capitalize">{header}</Text>
          </DataTable.Title>
          
        ))}

      </DataTable.Header>

      {data.map((row, rowIndex) => (

        <DataTable.Row key={rowIndex} className="border-y-0 ml-4 p-0">

          {row.map((cell, cellIndex) => (

            <DataTable.Cell key={cellIndex} className="h-4">
              <Text className="text-white text-sm font-isemibold capitalize">{cell}</Text>
            </DataTable.Cell>

          ))}

        </DataTable.Row>

      ))}

    </DataTable>

  );
};

