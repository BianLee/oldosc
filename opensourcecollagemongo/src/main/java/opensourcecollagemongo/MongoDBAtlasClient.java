package opensourcecollagemongo;

import java.util.concurrent.TimeUnit;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;

import org.bson.types.ObjectId;

public class MongoDBAtlasClient {
	public static void main(String[] args) {
		MongoClientURI uri = new MongoClientURI(
	  "mongodb+srv://bostonlobstergang:climbpg0326@cluster0.plwnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
		MongoClient mongoClient = new MongoClient(uri);
		MongoDatabase database = mongoClient.getDatabase("cluster0");
		MongoCollection<Document> collection = database.getCollection("messages");
		collection.deleteMany(new Document("title", "humanities"));
		collection.deleteMany(new Document("title", "testing"));
		collection.deleteMany(new Document("title", "d"));
		
		
		
		
		// Bson filter = new Document("title", "asdf");
		
		collection.createIndex(Indexes.ascending("date"), new IndexOptions().expireAfter(1L, TimeUnit.DAYS));

		
	//	Document stats = database.runCommand(new Document("collStats", "messages"));
		//System.out.println(stats);
		// collection.deleteMany(filter);  
			
			{
		}
	}
}
