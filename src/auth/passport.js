const passport = require("passport")
const ExtractJwt = require("passport-jwt").ExtractJwt
const StrategyJwt = require("passport-jwt").Strategy
const User = require("../models/user")

const cookieExtractor = function (req) {
  let token = null;
  console.log("\n Extracting: Cookies: ", req.cookies["auth"] );
  console.log("\n Extracting: Signed Cookies: ", req.signedCookies["auth"] );
  if (req && req.cookies) token = req.cookies["auth"];
  // if (req && req.signedCookies && req.signedCookies.jwt) {
  //   token = req.signedCookies["jwt"]["token"];
  // }
  return token;
};

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      maxAge: "7d",
      passReqToCallback: true,
    },
    async function (req, jwtPayload, done) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then(async (user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
)

module.exports = passport
