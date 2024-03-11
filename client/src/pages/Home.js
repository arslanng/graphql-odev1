import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENT_SUBSCRIPTION } from "./queries";
import { List } from "antd";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    // veri değiştiğinde reactta kullanılması için useEffect hooku kullanıldı.
    subscribeToMore({
      document: EVENT_SUBSCRIPTION, // dinlenilecek sorgu
      updateQuery: (
        prev, // mevcut durum
        { subscriptionData } // dinlenen kanaldan gelen
      ) => {
        console.log(prev, subscriptionData);
        
      },
    });
  }, [subscribeToMore]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data.events}
        renderItem={(item) => (
          <Link to={`events/${item.id}`}>
            <List.Item className={styles.listItem}>
              <div className={styles.listTitle}>{item.title}</div>
              <List.Item.Meta description={item.desc} />
              <div className={styles.listDate}>{item.date}</div>
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
}

export default Home;
