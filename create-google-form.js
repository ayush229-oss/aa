/**
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Click "New project"
 * 3. Delete everything in the editor
 * 4. Paste this entire script
 * 5. Click the ▶ Run button (select "createTraderSurvey" if asked)
 * 6. Allow permissions when prompted
 * 7. Check the Execution Log — it will print your form URL
 */

function createTraderSurvey() {

  const form = FormApp.create('Trader Research Survey — Help Us Build the Right Tool');

  form.setDescription(
    'Takes 3–4 minutes. No selling. Your answers directly shape what we build.\n' +
    'We will share findings back with everyone who responds.'
  );

  form.setConfirmationMessage(
    'Thank you — seriously. Your input directly shapes what we build. ' +
    'We will notify you when we launch if you left your email.'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);

  // ─────────────────────────────────────────
  // SECTION 1: About You
  // ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Section 1: About You')
    .setHelpText('Tell us a bit about your trading background.');

  form.addMultipleChoiceItem()
    .setTitle('How long have you been trading forex?')
    .setRequired(true)
    .setChoiceValues([
      'Less than 6 months — still learning',
      '6 months – 1 year',
      '1–3 years',
      '3–5 years',
      '5+ years'
    ]);

  form.addMultipleChoiceItem()
    .setTitle('What is your primary trading style?')
    .setRequired(true)
    .setChoiceValues([
      'Scalping — seconds to minutes per trade',
      'Day trading — all positions closed by end of day',
      'Swing trading — holding days to weeks',
      'Position trading — weeks to months',
      "I don't have a consistent style yet"
    ]);

  form.addCheckboxItem()
    .setTitle('Which instruments do you trade or want to trade?')
    .setHelpText('Select all that apply')
    .setRequired(true)
    .setChoiceValues([
      'EURUSD',
      'Gold (XAUUSD)',
      'GBPUSD',
      'USDJPY',
      'Crypto (BTC, ETH)',
      'Indices (US30, NAS100, SPX500)',
      'INR pairs on NSE/BSE (USDINR, EURINR)'
    ]);

  // ─────────────────────────────────────────
  // SECTION 2: Prop Firm Journey
  // ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Section 2: Prop Firm Journey')
    .setHelpText('Prop firms give funded capital to traders who pass a challenge. FTMO, FundedNext, The5ers are examples.');

  form.addMultipleChoiceItem()
    .setTitle('Where are you in your prop firm journey?')
    .setRequired(true)
    .setChoiceValues([
      'I am currently funded and trading with prop firm capital',
      'I am currently attempting a challenge',
      'I plan to attempt a challenge in the next 6 months',
      'I have tried and failed one or more challenges',
      "I'm curious but haven't decided yet",
      'Not interested in prop firms'
    ]);

  form.addCheckboxItem()
    .setTitle('Which prop firms are you aware of or have tried?')
    .setHelpText('Select all that apply')
    .setChoiceValues([
      'FTMO',
      'FundedNext',
      'The5ers',
      'Funded Trading Plus',
      'MyFundedFX',
      'E8 Funding',
      'Other'
    ]);

  form.addCheckboxItem()
    .setTitle('What is the hardest part of passing a prop firm challenge?')
    .setHelpText('Select all that apply')
    .setChoiceValues([
      'Managing the daily drawdown limit (e.g. 5% per day)',
      'Managing the maximum drawdown limit (e.g. 10% total)',
      'Consistently hitting the profit target',
      'Psychological pressure — knowing real rules are on the line',
      'Not knowing if my strategy actually works before I pay the fee',
      "I don't have a written, defined strategy to begin with"
    ]);

  // ─────────────────────────────────────────
  // SECTION 3: Current Workflow
  // ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Section 3: Your Current Testing Workflow')
    .setHelpText('This is the most important section for us — be honest.');

  form.addMultipleChoiceItem()
    .setTitle('How do you currently test a strategy before trading it live?')
    .setRequired(true)
    .setChoiceValues([
      "I don't test — I go straight to live or challenge accounts",
      'I manually look at charts and check entries visually',
      "I use MetaTrader's built-in strategy tester",
      'I use TradingView Pine Script backtesting',
      'I paper trade for a while and observe',
      'I use a dedicated backtesting tool (Forex Tester, etc.)'
    ]);

  form.addScaleItem()
    .setTitle('How realistic is your current testing vs actual trading conditions?')
    .setHelpText('1 = Not realistic at all  ·  5 = Very close to real conditions')
    .setBounds(1, 5)
    .setLabels('Not realistic at all', 'Very close to real');

  form.addCheckboxItem()
    .setTitle('What are your biggest frustrations when testing strategies?')
    .setHelpText('Select all that apply')
    .setRequired(true)
    .setChoiceValues([
      'I need coding skills I don\'t have (Pine Script, MQL5, Python)',
      "Can't test with realistic spreads, slippage, and commissions",
      "Can't simulate prop firm rules (drawdown caps, profit targets)",
      'Existing tools are too complex or overwhelming',
      "Can't tell if a strategy is genuinely good or just got lucky on past data",
      'Historical forex data is expensive or hard to get',
      "There's no clear workflow from strategy idea → live trading"
    ]);

  form.addMultipleChoiceItem()
    .setTitle('What % of your trades follow a written, defined strategy?')
    .setRequired(true)
    .setChoiceValues([
      '0% — I trade mostly on feel, gut, and intuition',
      '1–25% — Mostly intuition with a few loose rules',
      '26–50% — A mix of both',
      '51–75% — Mostly rules-based with some discretion',
      '76–100% — Strictly systematic, I follow rules every time'
    ]);

  // ─────────────────────────────────────────
  // SECTION 4: The Solution
  // ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Section 4: The Platform We\'re Building')
    .setHelpText(
      'The idea: A no-code platform where you build a forex strategy visually, ' +
      'backtest it on 10+ years of EURUSD/Gold data with realistic spreads and slippage, ' +
      'then simulate it under exact prop firm challenge rules (FTMO Phase 1: 5% daily DD, ' +
      '10% max DD, 8% profit target) — so you know if your strategy would pass BEFORE ' +
      'you pay the challenge fee.'
    );

  form.addScaleItem()
    .setTitle('How useful would this platform be for you?')
    .setHelpText('1 = Not useful at all  ·  5 = Extremely useful, I need this now')
    .setRequired(true)
    .setBounds(1, 5)
    .setLabels('Not useful at all', 'Need this now');

  form.addMultipleChoiceItem()
    .setTitle('Which feature matters most to you?')
    .setRequired(true)
    .setChoiceValues([
      'Visual, no-code strategy builder — no Python or Pine Script needed',
      'Realistic backtesting — actual spreads, slippage, and commissions',
      'Prop firm simulation mode — test under FTMO / FundedNext rules',
      'Deep performance reports — win rate, drawdown, expectancy, risk:reward',
      'Forward testing — run strategy on live market prices (simulated)',
      'Community — see what strategies others use and what passes challenges'
    ]);

  form.addMultipleChoiceItem()
    .setTitle('What would you pay per month for this platform?')
    .setRequired(true)
    .setChoiceValues([
      'Free only — I would not pay for this',
      '₹199 – ₹499 / month',
      '₹500 – ₹999 / month',
      '₹1,000 – ₹2,000 / month',
      'More than ₹2,000 / month — if it\'s genuinely good'
    ]);

  form.addParagraphTextItem()
    .setTitle('What would stop you from using this platform?')
    .setHelpText('Be honest — this helps us more than positive feedback. What would make you NOT use it?');

  // ─────────────────────────────────────────
  // SECTION 5: Stay in the Loop
  // ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Section 5: Stay in the Loop')
    .setHelpText('Completely optional — only if you want us to reach out or notify you at launch.');

  form.addTextItem()
    .setTitle('Your name (optional)')
    .setHelpText("Only if you're open to a 15-min follow-up call. We'll give you early access in return.");

  form.addTextItem()
    .setTitle('Email or Telegram handle (optional)')
    .setHelpText("We'll notify you at launch with early access pricing.");

  form.addMultipleChoiceItem()
    .setTitle('Want to be notified when we launch?')
    .setChoiceValues([
      'Yes — notify me at launch with early access pricing',
      'No thanks'
    ]);

  // ─────────────────────────────────────────
  // Done — print the URLs
  // ─────────────────────────────────────────
  const publishedUrl = form.getPublishedUrl();
  const editUrl = form.getEditUrl();

  Logger.log('✅ Form created successfully!');
  Logger.log('');
  Logger.log('📋 SHARE THIS LINK WITH TRADERS:');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('✏️  EDIT FORM (keep this private):');
  Logger.log(editUrl);
  Logger.log('');
  Logger.log('📊 VIEW RESPONSES:');
  Logger.log('Open the edit URL → Responses tab → Link to Sheets for a live spreadsheet');
}
