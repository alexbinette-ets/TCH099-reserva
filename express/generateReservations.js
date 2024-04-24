const fs = require('fs');

async function generationReservations(){
const dispos = [{
    "timestamp_debut": {"$date":"2024-04-23T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-23T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-23T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-23T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-23T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-23T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-23T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-23T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-24T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-24T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-24T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-24T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-24T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-24T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-24T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-24T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-25T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-25T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-25T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-25T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-25T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-25T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-25T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-25T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-26T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-26T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-26T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-26T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-26T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-26T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-26T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-26T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-27T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-27T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-27T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-27T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-27T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-27T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-27T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-27T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-28T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-28T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-28T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-28T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-28T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-28T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-28T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-28T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-29T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-29T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-29T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-29T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-29T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-29T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-29T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-29T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-30T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-30T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-30T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-30T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-30T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-30T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-04-30T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-04-30T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-01T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-01T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-01T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-01T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-01T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-01T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-01T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-01T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-02T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-02T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-02T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-02T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-02T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-02T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-02T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-02T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-03T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-03T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-03T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-03T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-03T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-03T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-03T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-03T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-04T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-04T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-04T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-04T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-04T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-04T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-04T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-04T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-05T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-05T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-05T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-05T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-05T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-05T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-05T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-05T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-06T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-06T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-06T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-06T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-06T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-06T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-06T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-06T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-07T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-07T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-07T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-07T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-07T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-07T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-07T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-07T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-08T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-08T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-08T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-08T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-08T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-08T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-08T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-08T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-09T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-09T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-09T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-09T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-09T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-09T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-09T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-09T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-10T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-10T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-10T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-10T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-10T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-10T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-10T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-10T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-11T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-11T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-11T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-11T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-11T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-11T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-11T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-11T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-12T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-12T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-12T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-12T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-12T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-12T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-12T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-12T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-13T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-13T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-13T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-13T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-13T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-13T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-13T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-13T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-14T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-14T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-14T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-14T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-14T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-14T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-14T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-14T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-15T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-15T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-15T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-15T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-15T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-15T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-15T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-15T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-16T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-16T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-16T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-16T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-16T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-16T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-16T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-16T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-17T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-17T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-17T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-17T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-17T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-17T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-17T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-17T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-18T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-18T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-18T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-18T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-18T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-18T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-18T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-18T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-19T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-19T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-19T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-19T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-19T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-19T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-19T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-19T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-20T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-20T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-20T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-20T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-20T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-20T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-20T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-20T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-21T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-21T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-21T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-21T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-21T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-21T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-21T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-21T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-22T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-22T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-22T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-22T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-22T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-22T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-22T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-22T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-23T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-23T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-23T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-23T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-23T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-23T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-23T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-23T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-24T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-24T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-24T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-24T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-24T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-24T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-24T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-24T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-25T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-25T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-25T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-25T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-25T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-25T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-25T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-25T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-26T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-26T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-26T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-26T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-26T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-26T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-26T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-26T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-27T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-27T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-27T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-27T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-27T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-27T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-27T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-27T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-28T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-28T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-28T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-28T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-28T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-28T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-28T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-28T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-29T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-29T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-29T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-29T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-29T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-29T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-29T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-29T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-30T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-30T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-30T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-30T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-30T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-30T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-30T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-30T22:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-31T18:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-31T19:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-31T19:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-31T20:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-31T20:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-31T21:00:00.000Z"}
  },
  {
    "timestamp_debut": {"$date":"2024-05-31T21:00:00.000Z"},
    "timestamp_fin": {"$date":"2024-05-31T22:00:00.000Z"}
  }]


function generateRandomNom() {
    const nom = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Liam", "Mia", "Noah", "Olivia", "Parker", "Quinn", "Ryan", "Sophia", "Thomas", "Uma", "Vincent", "Willow", "Xander", "Yara", "Zane"];
    return nom[Math.floor(Math.random() * nom.length)];
}

function generateRandomNomFamille() {
    const nomFam = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans"];
    return nomFam[Math.floor(Math.random() * nomFam.length)];
}

function generateRandomPhoneNumber() {
    const phoneNumber = Math.floor(Math.random() * 10000000000);
    return phoneNumber.toString().padStart(10, '0');
}

function generateRandomSpecification() {
    const specifications = ["Allergique Arachides", "Alergique Fruits de Mer", "Anniversaire", "Chaise pour Bébé", "Aucune", "Allergique Lait", "Date Night"];
    return specifications[Math.floor(Math.random() * specifications.length)];
}

function generateReservationNumber() {

    const randomNumber = Math.floor(Math.random() * 999) + 1;
    const start = new Date('1000-01-01').getTime();
    const end = new Date().getTime();
    const randomTimestamp = Math.floor(Math.random() * (end - start) + start);
    const randomDate = new Date(randomTimestamp);
    const annee = randomDate.getFullYear().toString();
    const nombreDeAnnee = annee.slice(-4);
    const reservationNumber = randomNumber + nombreDeAnnee;
    return parseInt(reservationNumber);
}


function generateRandomExtEmail() {
    const emailExtensions = ["@hotmail.com", "@gmail.com", "@yahoo.com", "@outlook.com", "@aol.com", "@icloud.com", "@mail.com", "@protonmail.com"];


    const randomExtension = emailExtensions[Math.floor(Math.random() * emailExtensions.length)];

    const randomEmail = randomExtension;

    return randomEmail;
}

function generateRandomServeur() {
    const names = ["Marco", "Elena", "Antonio", "Lucas", "Sophie", "Giovanni", "Luigi", "Maria", "Pietro"];
    return names[Math.floor(Math.random() * names.length)];
}


let reservationCount = 0;

dispos.forEach(dispo => {

    
    const randomNom = generateRandomNom();
    /*const randomPhoneNumber = generateRandomPhoneNumber();
    const randomSpecification = generateRandomSpecification();*/
    let reservation;
    if (reservationCount % 3 === 0) {
    reservation = {
        "numero_res": generateReservationNumber(),
        "nb_sieges": Math.floor(Math.random() * 3) + 4,
        "specification": generateRandomSpecification(),
        "prenom_serveur": generateRandomServeur(),
            "Client": {
                "nom_client": randomNom,
                "prenom_client": generateRandomNomFamille(),
                "telephone": generateRandomPhoneNumber(),
                "email": randomNom.toLowerCase() + generateRandomExtEmail() // 
            }
    };
}
    else {
        reservation = {};
    }

    dispo.Reservation = reservation;

    reservationCount++;
    });
return dispos;
}



async function createJsonFileWithDispos() {
    try {
        const reservations = await generationReservations();
        const jsonData = JSON.stringify(reservations, null, 2); 

        //const jsonData = JSON.stringify(dispos, null, 2); // Convertir l'objet en chaîne JSON avec indentation

        fs.writeFile('table10.json', jsonData, (err) => {
            if (err) {
                throw err;
            }
            console.log('Le fichier JSON "dispos.json" a été créé avec succès.');
        });
    } catch (error) {
        console.error("Une erreur est survenue lors de la création du fichier JSON :", error);
    }
}

createJsonFileWithDispos();