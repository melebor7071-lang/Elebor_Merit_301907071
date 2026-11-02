// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("loan_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("loan_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "loan_created",
                    "loan_renewed"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "loan"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "loan_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("loan_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 3
            },
            "snapshot": {
                "loan_id": 3,
                "member_id": 1,
                "book_id": 2,
                "checkout_date": "2025-03-01",
                "due_date": "2025-03-15",
                "returned_date": null
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1
                    },
                    "snapshot": {
                        "member_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test",
                        "joined_date": "2025-01-15"
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 2
                    },
                    "snapshot": {
                        "book_id": 2,
                        "isbn": "9780000000001",
                        "title": "The Quiet Index",
                        "author": "Morgan Lee",
                        "publication_year": 2020
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_renewed",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 3
            },
            "snapshot": {
                "loan_id": 3,
                "member_id": 1,
                "book_id": 2,
                "checkout_date": "2025-03-01",
                "due_date": "2025-03-15",
                "returned_date": null
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1
                    },
                    "snapshot": {
                        "member_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test",
                        "joined_date": "2025-01-15"
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 2
                    },
                    "snapshot": {
                        "book_id": 2,
                        "isbn": "9780000000001",
                        "title": "The Quiet Index",
                        "author": "Morgan Lee",
                        "publication_year": 2020
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "note": "illustrative note",
                "renewal_count": "illustrative renewal_count",
                "metadata": "illustrative metadata"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 4
            },
            "snapshot": {
                "loan_id": 4,
                "member_id": 1,
                "book_id": 2,
                "checkout_date": "2024-12-01",
                "due_date": "2024-12-15",
                "returned_date": "2024-12-12"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1
                    },
                    "snapshot": {
                        "member_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test",
                        "joined_date": "2025-01-15"
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 2
                    },
                    "snapshot": {
                        "book_id": 2,
                        "isbn": "9780000000001",
                        "title": "The Quiet Index",
                        "author": "Morgan Lee",
                        "publication_year": 2020
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_renewed",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 4
            },
            "snapshot": {
                "loan_id": 4,
                "member_id": 1,
                "book_id": 2,
                "checkout_date": "2024-12-01",
                "due_date": "2024-12-15",
                "returned_date": "2024-12-12"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 1
                    },
                    "snapshot": {
                        "member_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test",
                        "joined_date": "2025-01-15"
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 2
                    },
                    "snapshot": {
                        "book_id": 2,
                        "isbn": "9780000000001",
                        "title": "The Quiet Index",
                        "author": "Morgan Lee",
                        "publication_year": 2020
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "note": "illustrative note",
                "renewal_count": "illustrative renewal_count",
                "metadata": "illustrative metadata"
            }
        }
    }
]));
  await db.getCollection("loan_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("loan_events").find({"eventType":"loan_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("loan_events").find({"source.key.loan_id":3}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("loan_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("loan_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("loan_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "loan_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "loan",
        "key": {
            "loan_id": 3
        },
        "snapshot": {
            "loan_id": 3,
            "member_id": 1,
            "book_id": 2,
            "checkout_date": "2025-03-01",
            "due_date": "2025-03-15",
            "returned_date": null
        }
    },
    "embedded": {
        "member": [
            {
                "key": {
                    "member_id": 1
                },
                "snapshot": {
                    "member_id": 1,
                    "name": "Avery Chen",
                    "email": "avery.chen@example.test",
                    "joined_date": "2025-01-15"
                },
                "via": [
                    "loan.member_id → member"
                ]
            }
        ],
        "book": [
            {
                "key": {
                    "book_id": 2
                },
                "snapshot": {
                    "book_id": 2,
                    "isbn": "9780000000001",
                    "title": "The Quiet Index",
                    "author": "Morgan Lee",
                    "publication_year": 2020
                },
                "via": [
                    "loan.book_id → book"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("loan_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "loan_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "loan",
        "key": {
            "loan_id": 3
        },
        "snapshot": {
            "loan_id": 3,
            "member_id": 1,
            "book_id": 2,
            "checkout_date": "2025-03-01",
            "due_date": "2025-03-15",
            "returned_date": null
        }
    },
    "embedded": {
        "member": [
            {
                "key": {
                    "member_id": 1
                },
                "snapshot": {
                    "member_id": 1,
                    "name": "Avery Chen",
                    "email": "avery.chen@example.test",
                    "joined_date": "2025-01-15"
                },
                "via": [
                    "loan.member_id → member"
                ]
            }
        ],
        "book": [
            {
                "key": {
                    "book_id": 2
                },
                "snapshot": {
                    "book_id": 2,
                    "isbn": "9780000000001",
                    "title": "The Quiet Index",
                    "author": "Morgan Lee",
                    "publication_year": 2020
                },
                "via": [
                    "loan.book_id → book"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("loan_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
