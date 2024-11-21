const { Router } = require("express");
const {Account} = require("../db/index");
const { userAuthMIddle } = require("../midllewire/userAuth");
const mongoose = require("mongoose");

const router = Router();

router.post("/transfer", userAuthMIddle, async (req, res) => {
    const {to,amount}=req.body

    try {
        const account = await Account.findOne({ userId: req.userId });
    
        if (!account || account.balance < amount) {
            return res.status(400).json({ msg: "Insufficient balance" });
        }
    
        const toAccount = await Account.findOne({ userId: to });
    
        if (!toAccount) {
            return res.status(400).json({ msg: "Recipient account not found" });
        }
    
        await Account.updateOne({ userId: req.userId }, { "$inc": { balance: -amount } });
        await Account.updateOne({ userId: to }, { "$inc": { balance: amount } });
    
        res.json({ msg: "Transfer successful" });
    } catch (err) {
        console.error("Error in transfer:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
    
});

module.exports = router;
