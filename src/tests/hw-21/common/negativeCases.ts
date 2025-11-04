export const invalidUsernames = {
  empty: "",
  tooShort1: "a",
  tooShort2: "ab",
  tooLong41: "a".repeat(41),
  tooLong100: "x".repeat(100),

  onlySpaces: "   ",
  leadingSpace: " a",
  trailingSpace: "a ",
  bothSidesSpaces: " a ",

  leadingTab: "\tabc",
  trailingTab: "abc\t",
  withNewline: "abc\n",
  mixedWhitespace: " \nabc\t",

  emoji: "user💩name",
  cyrillic: "имя",
  punctuation: "user,",
  angleBrackets: "user<>",
  specialChars: "user!@#",
  quote: `"username"`,
  withSlash: "user/name",

  nonBreakingSpace: "user\u00A0name",
  middleDoubleSpace: "user  name",
  invisibleChar: "user\u200Bname", // zero-width space
};

export const invalidPasswords = {
  // длина
  empty: "",
  tooShort: "Ab1",                     // меньше 8 символов
  tooLong: "A".repeat(21),             // больше 20 символов

  // только пробелы
  onlySpaces: "        ",              // 8 пробелов

  // нет верхнего регистра
  noUppercase: "password123",          // только нижний регистр

  // нет нижнего регистра
  noLowercase: "PASSWORD123",          // только верхний регистр

  // нет букв вообще
  noLetters: "12345678",               // только цифры
  symbolsOnly: "!@#$%^&*",             // только спецсимволы

  // смешанные проблемы
  tooShortNoUppercase: "pass1",        // короткий и без верхнего регистра
  tooLongNoLowercase: "PASSWORD1234567890123", // длинный и без нижнего

  // пробелы с боков
  leadingSpace: " PassWord1",
  trailingSpace: "PassWord1 ",
  bothSidesSpaces: " PassWord1 ",

  // невидимые символы
  containsTab: "PassWord1\t",
  containsNewline: "Pass\nWord1",
  containsNonBreakingSpace: "Pass\u00A0Word1", // неразрывный пробел

  // нет цифр (если правило это подразумевает)
  noDigits: "Password",                // все буквы, но без цифр
};

export const credentialCases = [{title: "emptyLogin", login:"", pass: "Aa123456"}, {title: "emptyPassword", login:"Tester", pass:""}];
