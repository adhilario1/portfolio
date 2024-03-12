import React, { MouseEventHandler } from "react";

import "@aws-amplify/ui-react/styles.css";
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";


//MouseEventHandler<HTMLButtonElement>
const AdminLogin = ({ signOut, user }: WithAuthenticatorProps) => {
    return (
    <>
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth! {user?.username} </Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
    </>
    );
}

export default AdminLogin;