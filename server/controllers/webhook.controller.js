import { Webhook } from 'svix';
import User from '../models/User.model.js';

// Handle Clerk webhook events
export const handleClerkWebhook = async (req, res) => {
  try {
    // Get the headers
    const svix_id = req.headers['svix-id'];
    const svix_timestamp = req.headers['svix-timestamp'];
    const svix_signature = req.headers['svix-signature'];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: 'Error occurred -- no svix headers'
      });
    }

    // Get the body
    const payload = JSON.stringify(req.body);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let evt;

    // Verify the webhook
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return res.status(400).json({
        success: false,
        message: 'Error verifying webhook'
      });
    }

    // Handle the webhook
    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with ID ${id} and type ${eventType}`);
    console.log('Webhook body:', attributes);

    // Handle different event types
    switch (eventType) {
      case 'user.created':
        // Create user in database
        await User.create({
          clerkId: id,
          name: `${attributes.first_name || ''} ${attributes.last_name || ''}`.trim(),
          email: attributes.email_addresses[0]?.email_address,
          image: attributes.image_url
        });
        console.log('User created:', id);
        break;

      case 'user.updated':
        // Update user in database
        await User.findOneAndUpdate(
          { clerkId: id },
          {
            name: `${attributes.first_name || ''} ${attributes.last_name || ''}`.trim(),
            email: attributes.email_addresses[0]?.email_address,
            image: attributes.image_url
          }
        );
        console.log('User updated:', id);
        break;

      case 'user.deleted':
        // Delete user from database
        await User.findOneAndDelete({ clerkId: id });
        console.log('User deleted:', id);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
      error: error.message
    });
  }
};
