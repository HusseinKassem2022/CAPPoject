namespace com.myproject;

using { cuid, managed} from '@sap/cds/common';

entity Books:cuid, managed {
    title: String(255);
    author: Association to Authors;
    price: Decimal(10,2);
    publishedDate: Date;
    digitalCopy: Boolean;
}

entity Authors:cuid, managed {
    name: String(255);
    books: Association to many Books on books.author = $self;
    biography: String(2000);
    dateOfBirth: Date;}