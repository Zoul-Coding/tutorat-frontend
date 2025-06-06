export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export type CountryCode =
  | "AF" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM"
  | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ"
  | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BR" | "BN" | "BG" | "BF" | "BI"
  | "KH" | "CM" | "CA" | "CV" | "CF" | "TD" | "CL" | "CN" | "CO" | "KM" | "CG"
  | "CD" | "CR" | "CI" | "HR" | "CU" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO"
  | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "SZ" | "ET" | "FJ" | "FI" | "FR"
  | "GA" | "GM" | "GE" | "DE" | "GH" | "GR" | "GD" | "GT" | "GN" | "GW" | "GY"
  | "HT" | "HN" | "HU" | "IS" | "IN" | "ID" | "IR" | "IQ" | "IE" | "IL" | "IT"
  | "JM" | "JP" | "JO" | "KZ" | "KE" | "KI" | "KP" | "KR" | "KW" | "KG" | "LA"
  | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MG" | "MW" | "MY"
  | "MV" | "ML" | "MT" | "MH" | "MR" | "MU" | "MX" | "FM" | "MD" | "MC" | "MN"
  | "ME" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "NZ" | "NI" | "NE"
  | "NG" | "NO" | "OM" | "PK" | "PW" | "PA" | "PG" | "PY" | "PE" | "PH" | "PL"
  | "PT" | "QA" | "RO" | "RU" | "RW" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS"
  | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "SS" | "ES" | "LK"
  | "SD" | "SR" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG"
  | "TO" | "TT" | "TN" | "TR" | "TM" | "UG" | "UA" | "AE" | "GB" | "US" | "UY"
  | "UZ" | "VU" | "VE" | "VN" | "YE" | "ZM" | "ZW";

