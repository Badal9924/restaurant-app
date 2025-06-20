"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeEmailPage = welcomeEmailPage;
function welcomeEmailPage() {
    return `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Foomato </title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
    "
  >
    <table
      role="presentation"
      style="width: 100%; background-color: #f7f7f7; padding: 20px"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            style="
              width: 100%;
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <!-- Header Image -->
            <tr>
              <td style="padding: 0">
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Welcome to Foomato"
                  style="width: 100%; height: auto; display: block"
                />
              </td>
            </tr>

            <!-- Welcome Message -->
            <tr>
              <td
                style="
                  padding: 20px;
                  text-align: center;
                  background-color: #ff6b6b;
                  color: #ffffff;
                "
              >
                <h1 style="margin: 0; font-size: 28px">
                  Welcome to Foomato!
                </h1>
                <p style="margin: 10px 0 0; font-size: 16px">
                  Thank you for joining us. We're excited to serve you delicious
                  meals!
                </p>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 20px; color: #333333">
                <p style="margin: 0 0 10px">Dear Food Lover,</p>
                <p style="margin: 0 0 20px">
                  We are thrilled to have you as part of our family! At
                  Foomato, we pride ourselves on creating
                  unforgettable dining experiences with fresh, locally-sourced
                  ingredients, and a menu that delights every palate.
                </p>
                <p style="margin: 0 0 20px">
                  Get ready to savor some of our best culinary creations:
                </p>

                <ul style="list-style: none; padding: 0; margin: 0 0 20px">
                  <li style="margin: 0 0 10px">🍕 Handcrafted Pizzas</li>
                  <li style="margin: 0 0 10px">🍝 Authentic Pastas</li>
                  <li style="margin: 0 0 10px">🥗 Fresh Salads</li>
                  <li style="margin: 0 0 10px">🍰 Delicious Desserts</li>
                </ul>

                <tr>
                  <td
                    align="center"
                    style="padding: 20px; background-color: #ff6f61"
                  >
                    <h2 style="font-size: 22px; color: #fff; margin: 0">
                      Special Welcome Offer
                    </h2>
                    <p
                      style="
                        font-size: 16px;
                        color: #fff;
                        line-height: 1.6;
                        margin: 10px 0;
                      "
                    >
                      Enjoy 20% off on your first visit! Show this email to our
                      staff to claim your discount.
                    </p>
                    <a
                      href="restaurant-website-url"
                      style="
                        display: inline-block;
                        padding: 12px 24px;
                        color: #ff6f61;
                        background-color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                      "
                    >
                      Explore Our Menu
                    </a>
                  </td>
                </tr>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding: 20px">
                <a
                  href="https://www.yourrestaurantwebsite.com"
                  style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #ff6b6b;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                  "
                  >View Our Menu</a
                >
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  padding: 20px;
                  text-align: center;
                  font-size: 14px;
                  color: #888888;
                "
              >
                <p style="margin: 0">
                  Foomato , [Address Line 1], [City], [State]
                </p>
                <p style="margin: 5px 0 0">
                  Follow us on:
                  <a href="#" style="color: #ff6b6b; text-decoration: none"
                    >Instagram</a
                  >
                  |
                  <a href="#" style="color: #ff6b6b; text-decoration: none"
                    >Facebook</a
                  >
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `;
}
