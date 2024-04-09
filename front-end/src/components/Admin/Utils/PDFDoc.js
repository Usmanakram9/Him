import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import logo from "../../../assets/himalaya.png";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});
const styles = StyleSheet.create({
  page: {
    
    fontSize: 12,
    padding: 10,
  },
 
});

const PDFDoc = ({ delivery }) => (   
  <Document> 
    <Page size="A4" style={styles.page}> 
      <View style={styles.section}>
      <View style={tw("py-4 mx-auto flex ")}>

      <View style={tw("flex flex-row justify-between")}>
  <View style={tw("flex justify-start")}>
    <Text style={tw("text-2xl font-semibold text-gray-800")}>Order #{delivery._id}</Text>
    <Text style={tw("text-base font-medium text-gray-600")}>Shipment Date & Time: {format(new Date(delivery.createdAt), 'dd-MM-yyyy hh:mm:ss a')}</Text>
  </View>
  
  <View style={tw("flex justify-end")}>
  <View style={tw("flex justify-end w-200 items-end")}>
  <Image style={tw("w-24 h-24")} src={logo} alt="avatar" />
</View>

    <Text style={tw("text-1xl font-semibold text-gray-800")}>Order #{delivery._id}</Text>
  </View>
  
</View>

          <View style={tw("mt-10 flex flex-col xl:flex-row justify-center items-stretch w-2/4 xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0")}>
            <View style={tw("flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8")}>
              <View style={tw("flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full")}>
                <Text style={tw("text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800")}>Customer’s Cart</Text>
                <View style={tw("mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full")}>
                 
                  <View style={tw("flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0")}>
                    <View style={tw("w-full flex flex-col justify-start items-start space-y-8")}>
                      <Text style={tw("text-xl xl:text-2xl font-semibold leading-6 text-gray-800")}>High Quaility Italic Dress</Text>
                      <View style={tw("flex justify-start items-start flex-col space-y-2")}>
                        <Text style={tw("text-sm leading-none text-gray-800")}><span style={tw("text-gray-400 text-gray-300")}>Style: </span> Italic Minimal Design</Text>
                        <Text style={tw("text-sm leading-none text-gray-800")}><span style={tw("text-gray-400 text-gray-300")}>Size: </span> Small</Text>
                        <Text style={tw("text-sm leading-none text-gray-800")}><span style={tw("text-gray-400 text-gray-300")}>Color: </span> Light Blue</Text>
                      </View>
                    </View>
                    <View style={tw("flex justify-between space-x-8 items-start w-full")}>
                      <Text style={tw("text-base xl:text-lg leading-6")}>$20.00 <span style={tw("text-red-300 line-through")}> $30.00</span></Text>
                      <Text style={tw("text-base xl:text-lg leading-6 text-gray-800")}>01</Text>
                      <Text style={tw("text-base xl:text-lg font-semibold leading-6 text-gray-800")}>$20.00</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={tw("flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8")}>
                <View style={tw("flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6")}>
                  <Text style={tw("text-xl font-semibold leading-5 text-gray-800")}>Summary</Text>
                  <View style={tw("flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4")}>
                    <View style={tw("flex justify-between w-full")}>
                      <Text style={tw("text-base leading-4 text-gray-800")}>Subtotal</Text>
                      <Text style={tw("text-base leading-4 text-gray-600")}>$56.00</Text>
                    </View>
                    <View style={tw("flex justify-between items-center w-full")}>
                      <Text style={tw("text-base leading-4 text-gray-800")}>Discount <span style={tw("bg-gray-200 p-1 text-xs font-medium bg-white text-gray-800 leading-3 text-gray-800")}>STUDENT</span></Text>
                      <Text style={tw("text-base leading-4 text-gray-600")}>-$28.00 (50%)</Text>
                    </View>
                    <View style={tw("flex justify-between items-center w-full")}>
                      <Text style={tw("text-base leading-4 text-gray-800")}>Shipping</Text>
                      <Text style={tw("text-base leading-4 text-gray-600")}>$8.00</Text>
                    </View>
                  </View>
                  <View style={tw("flex justify-between items-center w-full")}>
                    <Text style={tw("text-base font-semibold leading-4 text-gray-800")}>Total</Text>
                    <Text style={tw("text-base font-semibold leading-4 text-gray-600")}>$36.00</Text>
                  </View>
                </View>
                <View style={tw("flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 bg-gray-800 space-y-6")}>
                  <Text style={tw("text-xl font-semibold leading-5 text-gray-800")}>Shipping</Text>
                  <View style={tw("flex justify-between items-start w-full")}>
                    <View style={tw("flex justify-center items-center space-x-4")}>
                      <div style={tw("w-8 h-8")}>
                        <Image style={{ width: '100%', height: '100%' }} alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                      </div>
                      <div style={tw("flex flex-col justify-start items-center")}>
                        <Text style={tw("text-lg leading-6 font-semibold text-gray-800")}>DPD Delivery<br /><span style={tw("font-normal")}>Delivery with 24 Hours</span></Text>
                      </div>
                    </View>
                    <Text style={tw("text-lg font-semibold leading-6 text-gray-800")}>$8.00</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={tw("bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col")}>
              <Text style={tw("text-xl font-semibold leading-5 text-gray-800")}>Customer</Text>
              <View style={tw("flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0")}>
                <View style={tw("flex flex-col justify-start items-start flex-shrink-0")}>
                  <View style={tw("flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200")}>
                    <Image style={{ width: 'auto', height: '64px' }} src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                    <View style={tw("flex justify-start items-start flex-col space-y-2")}>
                      <Text style={tw("text-base font-semibold leading-4 text-left text-gray-800")}>David Kent</Text>
                      <Text style={tw("text-sm leading-5 text-gray-600")}>10 Previous Orders</Text>
                    </View>
                  </View>
                  <View style={tw("flex justify-center text-gray-800 text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full")}>
                    <Text style={tw("cursor-pointer text-sm leading-5 ")}>david89@gmail.com</Text>
                  </View>
                </View>
                <View style={tw("flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0")}>
                  <View style={tw("flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start")}>
                    <View style={tw("flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8")}>
                      <Text style={tw("text-base text-white font-semibold leading-4 text-center md:text-left text-gray-800")}>Shipping Address</Text>
                      <Text style={tw("w-48 lg:w-full text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600")}>180 North King Street, Northhampton MA 1060</Text>
                    </View>
                    <View style={tw("flex justify-center md:justify-start items-center md:items-start flex-col space-y-4")}>
                      <Text style={tw("text-base text-white font-semibold leading-4 text-center md:text-left text-gray-800")}>Billing Address</Text>
                      <Text style={tw("w-48 lg:w-full text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600")}>180 North King Street, Northhampton MA 1060</Text>
                    </View>
                  </View>
                  <View style={tw("flex w-full justify-center items-center md:justify-start md:items-start")}>
                    <button style={tw("mt-6 md:mt-0 border-white hover:bg-gray-900 bg-transparent text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800")}>Edit Details</button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>  
);

export default PDFDoc;
