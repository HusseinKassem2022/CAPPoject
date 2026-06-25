using{com.myproject as db} from '../db/schema';

service CatalogService {
    entity Books as projection on db.Books;
    entity Authors as projection on db.Authors;
}

// annotate CatalogService.BooksSets with @(
//     UI:{
//         SelectionFields  : [
//             title, author.name, price
//         ],
//         LineItem  : [
//             {$Type: 'UI.DataField', Value: title},
//             {$Type: 'UI.DataField', Value: author.name},
//             {$Type: 'UI.DataField', Value: price},
//             {$Type: 'UI.DataField', Value: publishedDate}
//         ],
//     }
// );
