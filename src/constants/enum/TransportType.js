const TransportType = {
  IN_MEMORY: 1,
  RABBIT_MQ: 2,
  AZURE_SERVICE_BUS_CORE: 3
};

export const TransportTypeName = {
  [TransportType.IN_MEMORY]: "In Memory",
  [TransportType.RABBIT_MQ]: "Rabbit MQ",
  [TransportType.AZURE_SERVICE_BUS_CORE]: "Azure Service Bus Core"
};

export default TransportType;
