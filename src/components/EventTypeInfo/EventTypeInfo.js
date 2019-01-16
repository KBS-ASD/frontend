import React from "react";

const EventTypeInfo = () => (
  <ul>
    {Object.entries({
      PrePublish: "Called before the message is sent to the transport",
      PostPublish:
        "Called after the message is sent to the transport (and confirmed by the transport if supported)",
      PublishFault:
        "Called when the message fails to send to the transport, including the exception that was thrown",
      PreReceive:
        "Called immediately after the message was delivery by the transport",
      PreConsume: "Called before the consumer's Consume method is called",
      PostConsume:
        "Called after the consumer's Consume method is called, if an exception was thrown, the ConsumeFault method is called instead",
      PostReceive:
        "Called when the message was consumed, once for each consumer",
      ReceiveFault:
        "Called when an exception occurs early in the message processing, such as deserialization, etc.",
      ConsumeFault:
        "Called if the consumer's Consume method throws an exception",
      PreSend:
        "Called just before a message is sent, all the headers should be setup and everything",
      PostSend:
        "Called just after a message it sent to the transport and acknowledged (RabbitMQ)",
      SendFault: "Called if an exception occurred sending the message"
    }).map(([eventType, description]) => (
      <li>
        <strong>{eventType}</strong> - {description}
      </li>
    ))}
  </ul>
);

export default EventTypeInfo;
